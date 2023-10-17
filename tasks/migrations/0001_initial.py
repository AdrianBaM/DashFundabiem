# Generated by Django 4.2.6 on 2023-10-17 00:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dispositivo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipo', models.CharField(max_length=30, verbose_name='Equipo')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numeroPaciente', models.CharField(max_length=20, verbose_name='Número de Paciente')),
                ('tiempo', models.TimeField(verbose_name='Tiempo realizado')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('Dispositivo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tasks.dispositivo')),
            ],
        ),
    ]
