import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/AppBarTheme/appbartheme.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/BottomSheetTheme/bottomsheettheme.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/ElevatedButtonTheme/elevatedbuttontheme.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/TextFieldTheme/textfieldtheme.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/textThemes/text_theme.dart';

class TAppTheme{
  TAppTheme._();

  static ThemeData lighttheme = ThemeData(
    useMaterial3: true,
    fontFamily: 'Poppins',
    brightness: Brightness.light,
    scaffoldBackgroundColor: Colors.white,
    primaryColor: Colors.blue,
    textTheme: TTextTheme.lighttexttheme,
    elevatedButtonTheme: TElevatedButtonTheme.lightElevatedButtonTheme,
    appBarTheme: TAppbartheme.lightAppBarTheme,
    bottomSheetTheme: TBottomSheetTheme.lightBottomSheetTheme,
    inputDecorationTheme: TTextfieldtheme.lightInputDecorationTheme,
  );

  static ThemeData darktheme = ThemeData(
    useMaterial3: true,
    fontFamily: 'Poppins',
    brightness: Brightness.dark,
    scaffoldBackgroundColor: Colors.black12,
    primaryColor: Colors.blue,
    textTheme: TTextTheme.darktexttheme,
    elevatedButtonTheme: TElevatedButtonTheme.darkElevatedButtonTheme,
    appBarTheme: TAppbartheme.darkAppBarTheme,
    bottomSheetTheme: TBottomSheetTheme.darkBottomSheetTheme,
    inputDecorationTheme: TTextfieldtheme.darkInputDecorationTheme,
  );
}