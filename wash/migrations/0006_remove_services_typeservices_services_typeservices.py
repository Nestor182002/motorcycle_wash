# Generated by Django 4.0.5 on 2022-07-07 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wash', '0005_remove_services_typeservices_services_typeservices'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='services',
            name='typeServices',
        ),
        migrations.AddField(
            model_name='services',
            name='typeServices',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='typeservices', to='wash.typeofservices'),
            preserve_default=False,
        ),
    ]
