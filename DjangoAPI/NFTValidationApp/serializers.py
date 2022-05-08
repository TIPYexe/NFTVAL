import io

from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from NFTValidationApp.models import User, NFT, Wallet


# - User serializer -
class UserSerializer(serializers.ModelSerializer):
    # user_id = serializers.CharField(max_length=6)
    # user_email = serializers.EmailField(max_length=254)
    # user_f_name = serializers.CharField(max_length=32)
    # user_l_name = serializers.CharField(max_length=32)
    # user_dob = serializers.DateField()
    # user_last_access = serializers.DateTimeField()
    # user_active = serializers.BooleanField(default=False)
    # user_created = serializers.DateTimeField()
    # user_updated = serializers.DateTimeField()

    # def create(self, validated_data):
    #     return User(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.user_email = validated_data.get('user_email', instance.user_email)
    #     instance.user_f_name = validated_data.get('user_f_name', instance.user_f_name)
    #     instance.user_l_name = validated_data.get('user_l_name', instance.user_l_name)
    #     instance.user_dob = validated_data.get('user_dob', instance.user_dob)
    #     instance.user_last_access = validated_data.get('user_last_access', instance.user_last_access)
    #     instance.user_active = validated_data.get('user_active', instance.user_active)
    #     instance.user_updated = validated_data.get('user_updated', instance.user_updated)
    #     instance.save()
    #     return instance
    class Meta:
        model = User
        fields = ('user_id',
                  'user_email',
                  'user_f_name', 'user_l_name', 'user_dob', 'user_last_access', 'user_active', 'user_created', 'user_updated', 'password', 'profile_picture')


# # - Password serializer -
# class PasswordSerializer(serializers.Serializer):
#     pw_id = serializers.CharField(max_length=6)
#     user_id = serializers.CharField(max_length=6)
#     pw_encr_str = serializers.CharField(max_length=254)

#     def create(self, validated_data):
#         return Password(**validated_data)

#     def update(self, instance, validated_data):
#         instance.pw_encr_str = validated_data.get(
#             'pw_encr_str', instance.pw_encr_str)
#         instance.save()
#         return instance


# # - Event serializer -
# class EventSerializer(serializers.Serializer):
#     event_id = serializers.CharField(max_length=6)
#     event_name = serializers.CharField(max_length=10)
#     event_description = serializers.CharField(max_length=254)
#     event_severity = serializers.IntegerField()

#     def create(self, validated_data):
#         return Event(**validated_data)

#     def update(self, instance, validated_data):
#         instance.event_name = validated_data.get(
#             'event_name', instance.event_name)
#         instance.description = validated_data.get(
#             'description', instance.description)
#         instance.severity = validated_data.get('severity', instance.severity)
#         instance.save()
#         return instance


# # - UserLogs serializer -
# class UserLogsSerializer(serializers.Serializer):
#     log_id = serializers.CharField(max_length=6)
#     user_id = serializers.CharField(max_length=6)
#     event_id = serializers.CharField(max_length=6)

#     def create(self, validated_data):
#         return UserLogs(**validated_data)


# # - Role serializer -
# class RoleSerializer(serializers.Serializer):
#     role_id = serializers.CharField(max_length=6)
#     role_name = serializers.CharField(max_length=10)
#     role_descr = serializers.CharField(max_length=254)
#     role_access_level = serializers.IntegerField()

#     def create(self, validated_data):
#         return Role(**validated_data)

#     def update(self, instance, validated_data):
#         instance.role_name = validated_data.get(
#             'role_name', instance.role_name)
#         instance.role_descr = validated_data.get(
#             'role_descr', instance.role_descr)
#         instance.role_access_level = validated_data.get(
#             'role_access_level', instance.role_access_level)
#         instance.save()
#         return instance


# # - UserRole serializer -
# class UserRoleSerializer(serializers.Serializer):
#     user_id = serializers.CharField(max_length=6)
#     role_id = serializers.CharField(max_length=6)

#     def create(self, validated_data):
#         return UserRole(**validated_data)

#     def update(self, instance, validated_data):
#         instance.role_id = validated_data.get('role_id', instance.role_id)
#         instance.save()
#         return instance


# - Wallet serializer -
class WalletSerializer(serializers.ModelSerializer):
    # wallet_id = serializers.CharField(max_length=6)
    # user_id = serializers.CharField(max_length=6)
    # wallet_addr = serializers.CharField(max_length=254)

    # def create(self, validated_data):
    #     return Wallet(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.user_id = validated_data.get('user_id', instance.user_id)
    #     instance.wallet_addr = validated_data.get(
    #         'wallet_addr', instance.wallet_addr)
    #     instance.save()
    #     return instance
        class Meta:
            model = Wallet
            fields = ('wallet_id',
                    'user_id',
                    'wallet_addr')

# - NFT serializer -
class NFTSerializer(serializers.ModelSerializer):
    # nft_id = serializers.CharField(max_length=6)
    # wallet_id = serializers.CharField(max_length=6)
    # token = serializers.CharField(max_length=254)

    # def create(self, validated_data):
    #     return NFT(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.wallet_id = validated_data.get(
    #         'wallet_id', instance.wallet_id)
    #     instance.save()
    #     return instance
    class Meta:
        model = NFT
        fields = ('nft_id',
                  'wallet_id',
                  'token')


# # - UsedNFT serializer -
# class UsedNFTSerializer(serializers.Serializer):
#     token = serializers.CharField(max_length=254)
#     used_date = serializers.DateField()

#     def create(self, validated_data):
#         return UsedNFT(**validated_data)


# # - LogInAttempt serializer -
# class LogInAttemptSerializer(serializers.Serializer):
#     login_att_id = serializers.CharField(max_length=6)
#     account = serializers.CharField(max_length=64)
#     success = serializers.BooleanField()
#     date = serializers.DateField()
#     time = serializers.TimeField()

#     def create(self, validated_data):
#         return LogInAttempt(**validated_data)


# # - QR code serializer -
# class QRSerializer(serializers.Serializer):
#     qr_id = serializers.CharField(max_length=6)
#     token = serializers.CharField(max_length=254)
#     user_id = serializers.CharField(max_length=6)

#     def create(self, validated_data):
#         return QR(**validated_data)
