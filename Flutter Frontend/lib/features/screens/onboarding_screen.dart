// ignore_for_file: unused_local_variable

import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/image_strings.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/text_strings.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int pageIndex = 0;
  final controller = PageController(initialPage: 0,viewportFraction: 0.8, keepPage: true);
  @override
  Widget build(BuildContext context) {
    
    final brightness = MediaQuery.of(context).platformBrightness;
    final isDark = brightness == Brightness.dark;
    
    return Scaffold(
      body: Stack(
        children: [
          Column(),
          PageView(
            onPageChanged: (int index){
              setState(() {
                pageIndex = index;
              });
            },
            controller: controller,
            scrollDirection: Axis.horizontal,
            children: [
              OnBoardingPage(
                image: TImages.onboardingScreen1,
                title: TText.onBoardingTitle1,
                subtitle: TText.onBoardingSubtitle1,
              ),
              OnBoardingPage(
                image: TImages.onboardingScreen2,
                title: TText.onBoardingTitle2,
                subtitle: TText.onBoardingSubtitle2,
              ),
              OnBoardingPage(
                image: TImages.onboardingScreen3,
                title: TText.onBoardingTitle3,
                subtitle: TText.onBoardingSubtitle3,
              ),
            ],
          ),
          Positioned(
            bottom: 80,
            left: 0,
            right: 0,
            child: Center(
            child: SmoothPageIndicator(
              controller: controller,
              count: 3,
              effect: ExpandingDotsEffect(
                activeDotColor: isDark ?TColors.light : TColors.dark,
                dotHeight: 5
              ),),
          )),

          Positioned(
            top: 40,
            right: 20,
            child: TextButton(
              onPressed: (){
                Navigator.pushNamed(context, 'roleSelectionPage');
              }, 
              child: Text('skip',style: TextStyle(fontSize: 20),))),

          Positioned(
            bottom: 60,
            right: 20,
            child: ElevatedButton(style: ElevatedButton.styleFrom(shape: const CircleBorder(),backgroundColor: isDark ? TColors.light: Colors.black),
            onPressed: (){
              if(pageIndex == 2){
                Navigator.pushNamed(context, 'roleSelectionPage');
              }
              controller.nextPage(duration: Duration(milliseconds: 60), curve: Curves.slowMiddle);
            },
             child: Icon(Iconsax.arrow_right_1_copy,color: isDark ? Colors.black: TColors.light,))),
        ],
      ),
    );
  }
}

class OnBoardingPage extends StatelessWidget {
  final String image, title, subtitle;

  const OnBoardingPage({
    super.key,
    required this.image,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.all(40.0),
      child: Column(
        children: [
          const SizedBox(height: 100),
          Image(
            width: screenSize.width * 0.4,
            height: screenSize.height * 0.4,
            image: AssetImage(image),
          ),
          Text(
            title,
            style: Theme.of(context).textTheme.headlineMedium,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 3),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodyMedium,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class SkipButton extends StatelessWidget {
  const SkipButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }
}