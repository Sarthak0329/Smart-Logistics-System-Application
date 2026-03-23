import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final double screenSize = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 100,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadiusGeometry.circular(15),
        ),
        title: Text(
          "What is your Role ?",
          style: TextStyle(fontSize: 25, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
      ),
      body: Column(
        children: [
          SizedBox(height: 20),
          Image.asset(
            height: 220,
            width: 220,
            fit: BoxFit.contain,
            'assets/images/role_selection_images_gifs/Businessman flies up with rocket.gif',
          ),
          SizedBox(height: 10),
          Text(
            'Let us know,who are you ?',
            style: TextStyle(color: const Color.fromARGB(241, 12, 154, 206),fontFamily: 'Jumper',fontSize: 23),
          ),
          Center(
            child: Container(
              width: screenSize * 0.8,
              padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(25),
                gradient: LinearGradient(
                  colors: [
                    const Color.fromARGB(255, 234, 172, 36),
                    const Color.fromARGB(255, 223, 80, 9),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                children: [
                  SizedBox(
                    width: 250,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, 'adminDashboardPage');
                      },
                      child: Text("Admin",style: TextStyle(color: Colors.black),),
                    ),
                  ),
                  SizedBox(height: 15),
                  SizedBox(
                    width: 250,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, 'clientDashboardPage');
                      },
                      child: Text("Client",style: TextStyle(color: Colors.black),),
                    ),
                  ),
                  SizedBox(height: 15),
                  SizedBox(
                    width: 250,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, 'loginPage');
                      },
                      child: Text("Customer",style: TextStyle(color: Colors.black),),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Image.asset(
            height: 220,
            width: 220,
            fit: BoxFit.contain,
            'assets/images/role_selection_images_gifs/Sunrise - Breathe in Breathe out.gif'
           )
        ],
      ),
    );
  }
}
