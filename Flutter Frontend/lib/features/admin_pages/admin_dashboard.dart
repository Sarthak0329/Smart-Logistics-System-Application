import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/admin_pages/client_management.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/admin_pages/warehouse_management.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class AdminDashboard extends StatefulWidget {
	const AdminDashboard({super.key});

	@override
	State<AdminDashboard> createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {

	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(
				centerTitle: true,
				title: const Text('Admin Dashboard',style: TextStyle(fontSize: 25,fontFamily: 'Jumper'),),
				backgroundColor: TColors.accent,
				shape: RoundedRectangleBorder(borderRadius: BorderRadiusGeometry.circular(20)),
			),
			body: SingleChildScrollView(
				padding: const EdgeInsets.all(16),
				child: Center(
					child: Column(
					  children: [
              SizedBox(height: 40,),
              Image.asset('assets/images/role_selection_images_gifs/Admin CRM.gif',scale: 0.65,),
					    ConstrainedBox(
					    	constraints: const BoxConstraints(maxWidth: 640),
					    	child: Column(
					    		children: [
					    			_buildNavigationPanel(
					    				context,
					    				title: 'Client Verification Panel',
					    				description:
					    						'Review client signup requests and certify verified applications.',
					    				onTap: () {
					    					Navigator.push(
					    						context,
					    						MaterialPageRoute(
					    							builder: (_) => const ClientManagementPage(),
					    						),
					    					);
					    				},
					    			),
					    			const SizedBox(height: 16),
					    			_buildNavigationPanel(
					    				context,
					    				title: 'Warehouse Management Panel',
					    				description:
					    						'Add or drop warehouses and view animated storage capacity pie charts.',
					    				onTap: () {
					    					Navigator.push(
					    						context,
					    						MaterialPageRoute(
					    							builder: (_) => const WarehouseManagementPage(),
					    						),
					    					);
					    				},
					    			),
					    		],
					    	),
					    ),
					  ],
					),
				),
			),
		);
	}

	Widget _buildNavigationPanel(
		BuildContext context, {
		required String title,
		required String description,
		required VoidCallback onTap,
	}) {
		return InkWell(
			onTap: onTap,
			borderRadius: BorderRadius.circular(16),
			child: Container(
				width: double.infinity,
				padding: const EdgeInsets.all(18),
				decoration: BoxDecoration(
					gradient: const LinearGradient(
						begin: Alignment.topLeft,
						end: Alignment.bottomRight,
						colors: [TColors.primary, TColors.accent],
					),
					borderRadius: BorderRadius.circular(16),
				),
				child: Row(
					children: [
						Expanded(
							child: Column(
								crossAxisAlignment: CrossAxisAlignment.start,
								children: [
									Text(
										title,
										style: Theme.of(context).textTheme.titleLarge,
									),
									const SizedBox(height: 6),
									Text(description),
								],
							),
						),
						const Icon(Icons.arrow_forward_ios_rounded),
					],
				),
			),
		);
	}
}
