# Generated by Django 5.1.4 on 2025-01-18 15:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_patient_doctor'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sugartest',
            old_name='patient',
            new_name='patient_name',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='doctor',
        ),
    ]
