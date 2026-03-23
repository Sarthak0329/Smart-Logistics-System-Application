import 'package:flutter/material.dart';

class TColors{
  TColors._();

  //App Basic Colors 
  static const Color primary = Color(0xFFffca38);
  static const Color secondary = Color(0xFF156cbd);
  static const Color accent = Color(0xFFff6a19);

  //Gradient Colors
  static const Gradient linearGradient = LinearGradient(
    begin: Alignment(0.0, 0.0),
    end: Alignment(0.707, -0.707),
    colors: [
    Color.fromARGB(255, 2, 203, 207),
    Color.fromARGB(255, 167, 47, 215),
    Color.fromARGB(255, 21, 93, 226),
  ]);

  //text colors 
  static const Color textPrimary = Color.fromARGB(242, 228, 31, 67);
  static const Color textSecondary = Color.fromARGB(255, 0, 176, 61);
  static const Color textWhite = Colors.white;

  //Background Colors
   static const Color light = Color(0xFFF6F6F6);
   static const Color dark = Color(0xFF6C7570);
   static const Color primaryBackground = Color(0xFFF3F5FF);

   //Background Container Colors 
    static const Color lightContainer = Color(0xFFF6F6F6);
    static const Color darkContainer = Colors.white;

    //Button colors
    static const Color buttonPrimary = Color(0xFF4b68ff);
    static const Color buttonSecondary = Color(0xFF6c7570);
    static const Color buttonDisabled = Color(0xFFC4C4C4);

    //Border colors
    static const Color borderPrimary = Color(0xFF090909);
    static const Color borderSecondary = Color(0xFFE6E6E6); 

}