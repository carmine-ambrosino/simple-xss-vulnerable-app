from flask_sqlalchemy import SQLAlchemy


class DevelopmentConfig:
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://superadmin:secretpassword@db-1:5432/dbgpoffice'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig:
    DEBUG = False
   # SQLALCHEMY_DATABASE_URI = 'postgresql://adgpoffice:gpoffice@192.168.1.48:5432/dbgpoffice'
    SQLALCHEMY_DATABASE_URI = 'postgresql://superadmin:secretpassword@db-1:5432/dbgpoffice'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}

db = SQLAlchemy()
