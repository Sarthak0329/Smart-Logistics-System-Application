import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class CustomerAuthService {
  static String get _baseUrl {
    if (kIsWeb) {
      return "http://localhost:3000";
    }

    if (defaultTargetPlatform == TargetPlatform.android) {
      return "http://10.0.2.2:3000";
    }

    return "http://localhost:3000";
  }

  static Future<bool> register(String name, String email, String password) async {
    final Uri url = Uri.parse("$_baseUrl/customers/signup");
    try {
      final response = await http.post(
        url,
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final String? token = data["access_token"] as String?;
        if (token != null && token.isNotEmpty) {
          await storeToken(token);
        }
        return true;
      }

      debugPrint('Register failed: ${response.statusCode} ${response.body}');
      return false;
    } catch (error) {
      debugPrint('Register request error: $error');
      return false;
    }
  }

  static Future<bool> signIn(String email, String password) async {
    final Uri url = Uri.parse("$_baseUrl/customers/signin");
    try {
      final response = await http.post(
        url,
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final String? token = data["access_token"] as String?;
        if (token != null && token.isNotEmpty) {
          await storeToken(token);
        }
        return true;
      }

      debugPrint('Sign in failed: ${response.statusCode} ${response.body}');
      return false;
    } catch (error) {
      debugPrint('Sign in request error: $error');
      return false;
    }
  }

  static Future<void> storeToken(String token) async{
    
    final prefs = await SharedPreferences.getInstance();

    await prefs.setString("jwt_token", token);
  }
}