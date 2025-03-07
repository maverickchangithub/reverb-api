<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json('Invaild credentials', 401);
        }
        $user = User::firstWhere('email', $request->email);
        return response()->json([
                'token' => $user->createToken('reverb_accessToken')->plainTextToken,
            ]);
    }
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('You have successfully logged out.');
    }
}
