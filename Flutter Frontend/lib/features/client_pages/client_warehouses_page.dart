import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientWarehousesPage extends StatelessWidget {
  const ClientWarehousesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<ClientWarehouse> warehouses = [
      const ClientWarehouse(
        name: 'North Hub',
        location: 'Delhi',
        usedCapacity: 550,
        totalCapacity: 900,
      ),
      const ClientWarehouse(
        name: 'Central Depot',
        location: 'Nagpur',
        usedCapacity: 280,
        totalCapacity: 600,
      ),
      const ClientWarehouse(
        name: 'South Storage',
        location: 'Bengaluru',
        usedCapacity: 420,
        totalCapacity: 500,
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Accessible Warehouses',
          style: TextStyle(fontSize: 24, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: warehouses.length,
        itemBuilder: (context, index) {
          final ClientWarehouse warehouse = warehouses[index];
          final double usage =
              (warehouse.usedCapacity / warehouse.totalCapacity).clamp(0, 1);

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
                  warehouse.name,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 4),
                Text('Location: ${warehouse.location}'),
                const SizedBox(height: 8),
                Text(
                  'Capacity: ${warehouse.usedCapacity.toStringAsFixed(0)} / ${warehouse.totalCapacity.toStringAsFixed(0)} units',
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    minHeight: 10,
                    value: usage,
                    backgroundColor: Colors.white,
                    color: Colors.orange.shade800,
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class ClientWarehouse {
  const ClientWarehouse({
    required this.name,
    required this.location,
    required this.usedCapacity,
    required this.totalCapacity,
  });

  final String name;
  final String location;
  final double usedCapacity;
  final double totalCapacity;
}
