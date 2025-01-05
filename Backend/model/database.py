import sqlalchemy
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import asynccontextmanager
from config import DATABASE_URL

# SQLAlchemy Base
Base = declarative_base()

# Async Engine and SessionMaker
engine = create_async_engine(DATABASE_URL, echo=True, future=True)
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Dependency to provide an AsyncSession
@asynccontextmanager
async def get_session():
    """
    Provide a transactional scope around a series of operations.
    """
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

async def create_or_update_tables():
    """
    Create tables if they don't exist and add missing columns to existing tables.
    """
    async with engine.begin() as conn:
        # Get existing table names
        result = await conn.execute(sqlalchemy.text("SELECT name FROM sqlite_master WHERE type='table';"))
        existing_tables = {row[0] for row in result}

        for table in Base.metadata.tables.values():
            table_name = table.name
            if table_name in existing_tables:
                # Add missing columns if necessary
                for column in table.columns:
                    column_exists_query = f"PRAGMA table_info({table_name});"
                    pragma_result = await conn.execute(sqlalchemy.text(column_exists_query))
                    existing_columns = {row[1] for row in pragma_result}
                    if column.name not in existing_columns:
                        add_column_query = f'ALTER TABLE {table_name} ADD COLUMN {column.name} {column.type}'
                        await conn.execute(sqlalchemy.text(add_column_query))
            else:
                # Create table if it doesn't exist
                await conn.run_sync(table.create)

async def init_db():
    """
    Initialize the database: Create tables and add missing columns.
    """
    print("Initializing database...")
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    # Check for missing columns and update tables
    await create_or_update_tables()
