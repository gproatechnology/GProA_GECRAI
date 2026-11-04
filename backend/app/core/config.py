from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    APP_NAME: str = "GECRAI API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Servidor
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Seguridad
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Base de datos
    DATABASE_URL: str = "sqlite:///./gecrais.db"

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
