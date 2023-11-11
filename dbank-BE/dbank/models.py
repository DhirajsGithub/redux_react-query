from django.db import models

class User(models.Model):
    full_name = models.CharField(max_length=30)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  
    balance = models.IntegerField(default=0)

    def __str__(self):
        return self.full_name + " - " + self.email