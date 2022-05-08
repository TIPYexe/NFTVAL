from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from NFTValidationApp.models import  User, NFT, Wallet
from NFTValidationApp.serializers import UserSerializer, NFTSerializer, WalletSerializer


@csrf_exempt
def userApi(request, id = 0):
    if request.method=='GET':
        if id:
            users = users = User.objects.filter(user_id=id)
        else:
            users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        print(user_serializer)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)

    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(user_id=user_data['user_id'])
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        user = User.objects.get(user_id=id)
        user.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def walletApi(request, id = 0):
    if request.method=='GET':
        wallets = Wallet.objects.all()
        if id:
            wallets = Wallet.objects.filter(wallet_id=id)
        else:
            wallets = Wallet.objects.all()
        wallets_serializer = WalletSerializer(wallets, many=True)
        return JsonResponse(wallets_serializer.data, safe=False)

    elif request.method=='POST':
        wallet_data=JSONParser().parse(request)
        wallet_serializer = WalletSerializer(data=wallet_data)
        print(wallet_serializer)
        if wallet_serializer.is_valid():
            wallet_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)

    elif request.method=='DELETE':
        wallet = Wallet.objects.get(wallet_id=id)
        wallet.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def nftApi(request, id = 0):
    if request.method=='GET':
        if id:
            nfts = NFT.objects.filter(nft_id=id)
        else:
            nfts = NFT.objects.all()
        nfts_serializer = NFTSerializer(nfts, many=True)
        return JsonResponse(nfts_serializer.data, safe=False)

    elif request.method=='POST':
        nft_data=JSONParser().parse(request)
        nft_serializer = NFTSerializer(data=nft_data)
        print(nft_serializer)
        if nft_serializer.is_valid():
            nft_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)