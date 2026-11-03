"""Script para crear el usuario administrador por defecto en la base de datos."""
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models import User


def seed_demo_user():
    """Crea el usuario admin/demo si no existe."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.username == "admin").first()
        if not existing:
            admin_user = User(
                username="admin",
                email="admin@gecrai.com",
                hashed_password=get_password_hash("1234"),
                role="admin",
                is_active=True,
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            print(f"Usuario demo creado: {admin_user.username} / contraseña: 1234")
        else:
            print(f"Usuario admin ya existe: {existing.username}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_demo_user()
