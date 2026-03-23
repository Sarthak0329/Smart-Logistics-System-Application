import 'package:flutter/material.dart';

class TTextTheme{
  TTextTheme._();
  
  static TextTheme lighttexttheme = TextTheme(
    headlineLarge: TextStyle().copyWith(fontSize: 32,fontWeight: FontWeight.bold,color: Colors.blue),
    headlineMedium: TextStyle().copyWith(fontSize: 22,fontWeight: FontWeight.w700,color: Colors.black),
    headlineSmall: TextStyle().copyWith(fontSize: 18,fontWeight: FontWeight.w600,color: Colors.black),

    titleLarge: TextStyle().copyWith(fontSize: 16,fontWeight: FontWeight.w600,color: Colors.black),
    titleMedium: TextStyle().copyWith(fontSize:16,fontWeight: FontWeight.w500,color: Colors.black),
    titleSmall: TextStyle().copyWith(fontSize: 16,fontWeight: FontWeight.w400,color: Colors.black),

    bodyLarge: TextStyle().copyWith(fontSize: 14,fontWeight: FontWeight.w500,color: Colors.black),
    bodyMedium: TextStyle().copyWith(fontSize:14,fontWeight: FontWeight.normal,color: Colors.black),
    bodySmall: TextStyle().copyWith(fontSize: 14,fontWeight: FontWeight.w500,color: Colors.black.withAlpha(1)),

    labelLarge: TextStyle().copyWith(fontSize: 12,fontWeight: FontWeight.normal,color: Colors.black),
    labelMedium: TextStyle().copyWith(fontSize: 12,fontWeight: FontWeight.normal,color: Colors.black.withAlpha(1)),
  );  
  static TextTheme darktexttheme = TextTheme(
    headlineLarge: TextStyle().copyWith(fontSize: 32,fontWeight: FontWeight.bold,color: Colors.white),
    headlineMedium: TextStyle().copyWith(fontSize: 20,fontWeight: FontWeight.w600,color: Colors.white),
    headlineSmall: TextStyle().copyWith(fontSize: 18,fontWeight: FontWeight.w600,color: Colors.white),

    titleLarge: TextStyle().copyWith(fontSize: 16,fontWeight: FontWeight.w600,color: Colors.white),
    titleMedium: TextStyle().copyWith(fontSize:16,fontWeight: FontWeight.w500,color: Colors.white),
    titleSmall: TextStyle().copyWith(fontSize: 16,fontWeight: FontWeight.w400,color: Colors.white),

    bodyLarge: TextStyle().copyWith(fontSize: 14,fontWeight: FontWeight.w500,color: Colors.white),
    bodyMedium: TextStyle().copyWith(fontSize:14,fontWeight: FontWeight.normal,color: Colors.white),
    bodySmall: TextStyle().copyWith(fontSize: 14,fontWeight: FontWeight.w500,color: Colors.white.withAlpha(1)),

    labelLarge: TextStyle().copyWith(fontSize: 12,fontWeight: FontWeight.normal,color: Colors.white),
    labelMedium: TextStyle().copyWith(fontSize: 12,fontWeight: FontWeight.normal,color: Colors.white.withAlpha(1)),

  );  
  

}