from core.settings.base import *

DEBUG = config('DEBUG')

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {

    'default': {

        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': 'motocicle_wash',

        'USER': config('USER'),

        'PASSWORD': config('PASSWORD'),

        'HOST': '127.0.0.1',

        'PORT': '5432',

    }

}
