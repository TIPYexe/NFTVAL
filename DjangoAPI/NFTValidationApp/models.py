from django.db import models

import re
from django.core.exceptions import ValidationError

# - site-packages -
from email_validator import validate_email, ValidatedEmail


def validator_passwd(string):
    """
    password validator;

    :param string: string
    :return:    true if given string matches:
                min length is 6 and max length is 20,
                at least include a digit number,
                at least an uppercase and a lowercase letter,
                at least a special character
    """
    if re.match(r'^(?=\S{6,20}$)(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^A-Za-z\s\d])', string) is None:
        raise ValidationError("[error]: password not valid")


# whatever validate_email does by default
def validator_email(string):
    """
    email validator;

    :param string: string
    :return: true if email_validator's validate_email() func validates the string
    """
    if validate_email(string) is not ValidatedEmail:
        raise ValidationError(f"[error]: {string} is not a valid email")


# - User model -
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_email = models.EmailField(max_length=254, unique=True)
    user_f_name = models.CharField(max_length=32)
    user_l_name = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    profile_picture = models.BinaryField(blank=True)
    user_dob = models.DateField()
    user_last_access = models.DateTimeField(auto_now_add=True, blank=True)
    user_active = models.BooleanField(default=False, blank=True)
    user_created = models.DateTimeField(auto_now_add=True, blank=True)
    user_updated = models.DateTimeField(auto_now=True, blank=True)


# # - Password model -
# class Password(models.Model):
#     pw_id = models.CharField(max_length=6, primary_key=True)
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE)
#     pw_encr_str = models.CharField(max_length=254)


# # - Event model -
# class Event(models.Model):
#     event_id = models.CharField(max_length=6, primary_key=True)
#     event_name = models.CharField(max_length=10, unique=True)
#     event_description = models.CharField(max_length=254)
#     event_severity = models.IntegerField()


# # - UserLogs model -
# class UserLogs(models.Model):
#     log_id = models.CharField(max_length=6, primary_key=True)
#     user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, unique=False)
#     event_id = models.ForeignKey(Event, on_delete=models.DO_NOTHING, unique=False)
#     date = models.DateField(auto_now_add=True)
#     time = models.TimeField(auto_now_add=True)


# # - Role model -
# class Role(models.Model):
#     role_id = models.CharField(max_length=6, primary_key=True)
#     role_name = models.CharField(max_length=10, unique=True)
#     role_descr = models.CharField(max_length=254)
#     role_access_level = models.IntegerField()


# # - UserRole model -
# class UserRole(models.Model):
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True, unique=True)
#     role_id = models.ForeignKey(Role, on_delete=models.CASCADE, unique=True)


# - Wallet model -
class Wallet(models.Model):
    wallet_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    wallet_addr = models.CharField(max_length=254, unique=True)


# - NFT model -
class NFT(models.Model):
    nft_id = models.AutoField(primary_key=True)
    wallet_id = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    token = models.CharField(max_length=254, unique=True)


# # - UsedNFT model -
# class UsedNFT(models.Model):
#     token = models.CharField(max_length=254, primary_key=True)
#     used_date = models.DateField(auto_now_add=True)


# # - LogInAttempt model -
# class LogInAttempt(models.Model):
#     login_att_id = models.CharField(max_length=6, primary_key=True)
#     account = models.CharField(max_length=64)
#     success = models.BooleanField()
#     date = models.DateField(auto_now_add=True)
#     time = models.TimeField(auto_now_add=True)


# # - QR code model -
# class QR(models.Model):
#     qr_id = models.CharField(max_length=6, primary_key=True)
#     token = models.CharField(max_length=254, unique=True)
#     user_id = models.CharField(max_length=6, unique=True)


