# Generated by Django 4.0.5 on 2022-06-22 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wash', '0002_employee_company_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='earnings',
            field=models.IntegerField(default=0),
        ),
    ]
