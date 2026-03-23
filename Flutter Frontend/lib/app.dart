import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/admin_pages/admin_dashboard.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/authentication/signup_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/authentication/login_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/client_pages/client_dashboard.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/role_selection/role_selection_screen.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/screens/onboarding_screen.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/themes/theme.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.system,
      theme: TAppTheme.lighttheme,
      darkTheme: TAppTheme.darktheme,
      home: OnboardingScreen(),
      routes: {
        '/onBoardingPage' : (context) => const OnboardingScreen(),
        'roleSelectionPage' : (context) => const RoleSelectionScreen(),
        'loginPage' : (context) => const AuthScreen(),
        'SignInPage' : (context) => const LoginPage(),
        'adminDashboardPage' : (context) => const AdminDashboard(),
        'clientDashboardPage' : (context) => const ClientDashboardPage(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Role Selection screen',style: Theme.of(context).textTheme.displaySmall,),),
    );
  }
}