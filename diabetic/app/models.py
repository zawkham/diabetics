# from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    ROLE_CHOICES = [
        ('Patient', 'Patient'),
        ('Doctor', 'Doctor'),
        ('Admin', 'Admin'),
    ]
    username=models.CharField(max_length=20,unique=True)
    password= models.CharField(max_length=200)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username  # Return the username directly





class Doctor  (models.Model):
    from django.contrib.auth.models import User
from django.db import models

class Comment(models.Model):
    # Existing fields...
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    dname=models.CharField(max_length=100,unique=True)
    phone=models.CharField(max_length=15, unique=True)
    # email=models.EmailField(blank=True,null=True)

    def __str__(self):
        return f"dr.{self.dname}"
    

class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    
    patient_name = models.CharField(max_length=100)  
    address = models.CharField(max_length=25)  
    age = models.PositiveIntegerField()
    phone_no = models.CharField(max_length=15, unique=True)  
    email = models.EmailField( unique=True)  
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    # doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return f"{self.patient_name}"
    
class SugarTest(models.Model):
    patient= models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sugar_tests')  
    test_type = models.CharField(max_length=50)  
    test_date = models.DateTimeField(auto_now_add=True)  
    level = models.DecimalField(max_digits=5, decimal_places=2)  

    def __str__(self):
        return f"{self.patient.patient_name} - {self.test_type} on {self.test_date}"
    
class Comment(models.Model):
    sugartest= models.ForeignKey(SugarTest, on_delete=models.CASCADE)  
    description = models.TextField(max_length=255, null=True, blank=True)  

    def __str__(self):
        return f'{self.sugartest} by {self.id} '
