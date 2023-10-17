from django.db import models

# Create your models here.

class Dispositivo(models.Model):
    equipo = models.CharField(max_length=30, verbose_name='Equipo')

    def nombreDispositivo(self):
        return "{}".format(self.equipo)
    
    def __str__(self):
        return self.equipo

class Task(models.Model):
    numeroPaciente = models.CharField(max_length=20, verbose_name='Número de Paciente')
    Dispositivo = models.ForeignKey(Dispositivo, null=True, on_delete=models.CASCADE)
    tiempo = models.TimeField(verbose_name='Tiempo realizado')
    fecha =  models.DateField(verbose_name='Fecha')

    def __str__(self):
        return self.numeroPaciente