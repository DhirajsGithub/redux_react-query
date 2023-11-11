# Generated by Django 4.2.7 on 2023-11-10 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dbank", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name="user", name="password", field=models.CharField(max_length=128),
        ),
    ]
