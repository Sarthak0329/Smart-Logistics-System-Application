import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/client_pages/client_details_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/client_pages/client_live_tracking_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/client_pages/client_shipments_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/features/client_pages/client_warehouses_page.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientDashboardPage extends StatelessWidget {
	const ClientDashboardPage({super.key});

	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(
				centerTitle: true,
				title: const Text(
					'Client Dashboard',
					style: TextStyle(fontSize: 25, fontFamily: 'Jumper'),
				),
				backgroundColor: TColors.accent,
				shape: RoundedRectangleBorder(
					borderRadius: BorderRadiusGeometry.circular(20),
				),
			),
			body: SingleChildScrollView(
				padding: const EdgeInsets.all(16),
				child: Center(
					child: ConstrainedBox(
						constraints: const BoxConstraints(maxWidth: 980),
						child: const Row(
							crossAxisAlignment: CrossAxisAlignment.start,
							children: [
								Expanded(
									child: Column(
										children: [
											_DashboardCard(
												title: 'Deliveries Status',
												subtitle:
														'Check rejected and in-transit deliveries',
												icon: Icons.local_shipping_outlined,
												destination: ClientShipmentsPage(),
											),
											SizedBox(height: 14),
											_DashboardCard(
												title: 'Clients & Details',
												subtitle:
														'View Customer related information',
												icon: Icons.groups_outlined,
												destination: ClientDetailsPage(),
											),
										],
									),
								),
								SizedBox(width: 14),
								Expanded(
									child: Column(
										children: [
											_DashboardCard(
												title: 'Accessible Warehouses',
												subtitle: 'View warehouse related data',
												icon: Icons.warehouse_outlined,
												destination: ClientWarehousesPage(),
											),
											SizedBox(height: 14),
											_DashboardCard(
												title: 'Live Tracking',
												subtitle: 'Track shipment locations in real time',
												icon: Icons.location_on_outlined,
												destination: ClientLiveTrackingPage(),
											),
										],
									),
								),
							],
						),
					),
				),
			),
		);
	}
}

class _DashboardCard extends StatelessWidget {
	const _DashboardCard({
		required this.title,
		required this.subtitle,
		required this.icon,
		required this.destination,
	});

	final String title;
	final String subtitle;
	final IconData icon;
	final Widget destination;

	@override
	Widget build(BuildContext context) {
		return InkWell(
			borderRadius: BorderRadius.circular(16),
			onTap: () {
				Navigator.push(
					context,
					MaterialPageRoute(builder: (_) => destination),
				);
			},
			child: SizedBox(
				height: 148,
				width: double.infinity,
				child: Container(
					padding: const EdgeInsets.all(16),
					decoration: BoxDecoration(
						gradient: const LinearGradient(
							begin: Alignment.topLeft,
							end: Alignment.bottomRight,
							colors: [TColors.primary, TColors.accent],
						),
						borderRadius: BorderRadius.circular(16),
						boxShadow: [
							BoxShadow(
								color: Colors.black.withAlpha(35),
								blurRadius: 10,
								offset: const Offset(0, 5),
							),
						],
					),
					child: Row(
						children: [
							CircleAvatar(
								radius: 22,
								backgroundColor: Colors.white,
								child: Icon(icon, color: TColors.accent),
							),
							const SizedBox(width: 14),
							Expanded(
								child: Column(
									mainAxisAlignment: MainAxisAlignment.center,
									crossAxisAlignment: CrossAxisAlignment.start,
									children: [
										Text(
											title,
											style: Theme.of(context).textTheme.titleMedium?.copyWith(
												fontFamily: 'Jumper',
												fontSize: 10,
											),
											maxLines: 2,
											overflow: TextOverflow.visible,
										),
										const SizedBox(height: 4),
										Text(
											subtitle,
											maxLines: 2,
											overflow: TextOverflow.ellipsis,
										),
									],
								),
							),
							const Icon(Icons.chevron_right),
						],
					),
				),
			),
		);
	}
}
