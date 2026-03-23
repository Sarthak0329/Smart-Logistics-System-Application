import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientShipmentsPage extends StatelessWidget {
  const ClientShipmentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<ShipmentStatus> shipments = [
      const ShipmentStatus(
        shipmentId: 'SHP-1001',
        customerName: 'Anaya Bakers',
        status: 'IN TRANSIT',
        route: 'Delhi → Jaipur',
      ),
      const ShipmentStatus(
        shipmentId: 'SHP-1002',
        customerName: 'Metro Office Supplies',
        status: 'REJECTED',
        route: 'Nagpur → Pune',
      ),
      const ShipmentStatus(
        shipmentId: 'SHP-1003',
        customerName: 'Hillside Grocers',
        status: 'IN TRANSIT',
        route: 'Bengaluru → Mysuru',
      ),
      const ShipmentStatus(
        shipmentId: 'SHP-1004',
        customerName: 'GreenLeaf Stores',
        status: 'REJECTED',
        route: 'Chennai → Coimbatore',
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Deliveries Status',
          style: TextStyle(fontSize: 24, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: shipments.length,
        itemBuilder: (context, index) {
          final ShipmentStatus shipment = shipments[index];
          final bool isRejected = shipment.status == 'REJECTED';

          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [TColors.primary, TColors.accent],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  shipment.shipmentId,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 4),
                Text('Customer: ${shipment.customerName}'),
                Text('Route: ${shipment.route}'),
                const SizedBox(height: 8),
                Chip(
                  label: Text(shipment.status),
                  backgroundColor:
                      isRejected ? Colors.red.shade200 : Colors.green.shade200,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class ShipmentStatus {
  const ShipmentStatus({
    required this.shipmentId,
    required this.customerName,
    required this.status,
    required this.route,
  });

  final String shipmentId;
  final String customerName;
  final String status;
  final String route;
}
