from core.settings.base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG')

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {

    'default': {

        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': 'motocicles_wash',

        'USER': '',

        'PASSWORD': '',

        'HOST': '',

        'PORT': '5432',

    }

}
