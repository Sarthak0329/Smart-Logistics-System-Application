import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class WarehouseManagementPage extends StatefulWidget {
  const WarehouseManagementPage({super.key});

  @override
  State<WarehouseManagementPage> createState() => _WarehouseManagementPageState();
}

class _WarehouseManagementPageState extends State<WarehouseManagementPage> {
  final List<Warehouse> _warehouses = [
    Warehouse(
      name: 'North Hub',
      location: 'Delhi',
      usedCapacity: 550,
      totalCapacity: 900,
    ),
    Warehouse(
      name: 'Central Depot',
      location: 'Nagpur',
      usedCapacity: 280,
      totalCapacity: 600,
    ),
    Warehouse(
      name: 'South Storage',
      location: 'Bengaluru',
      usedCapacity: 420,
      totalCapacity: 500,
    ),
  ];

  final TextEditingController _warehouseNameController = TextEditingController();
  final TextEditingController _warehouseLocationController = TextEditingController();
  final TextEditingController _warehouseTotalCapacityController = TextEditingController();
  final TextEditingController _warehouseUsedCapacityController = TextEditingController();

  @override
  void dispose() {
    _warehouseNameController.dispose();
    _warehouseLocationController.dispose();
    _warehouseTotalCapacityController.dispose();
    _warehouseUsedCapacityController.dispose();
    super.dispose();
  }

  void _addWarehouse() {
    final String name = _warehouseNameController.text.trim();
    final String location = _warehouseLocationController.text.trim();
    final double? totalCapacity = double.tryParse(
      _warehouseTotalCapacityController.text.trim(),
    );
    final double? usedCapacity = double.tryParse(
      _warehouseUsedCapacityController.text.trim(),
    );

    if (name.isEmpty ||
        location.isEmpty ||
        totalCapacity == null ||
        usedCapacity == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Fill all warehouse fields correctly.')),
      );
      return;
    }

    if (totalCapacity <= 0 || usedCapacity < 0 || usedCapacity > totalCapacity) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Used capacity must be between 0 and total capacity.'),
        ),
      );
      return;
    }

    setState(() {
      _warehouses.add(
        Warehouse(
          name: name,
          location: location,
          usedCapacity: usedCapacity,
          totalCapacity: totalCapacity,
        ),
      );
    });

    _warehouseNameController.clear();
    _warehouseLocationController.clear();
    _warehouseTotalCapacityController.clear();
    _warehouseUsedCapacityController.clear();
  }

  void _dropWarehouse(int index) {
    final String warehouseName = _warehouses[index].name;
    setState(() {
      _warehouses.removeAt(index);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$warehouseName removed from active warehouses.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Warehouse Management',
          style: TextStyle(fontSize: 25, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadiusGeometry.circular(20),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildWarehouseManagementPanel(context),
            const SizedBox(height: 16),
            _buildWarehouseCapacityPanel(context),
          ],
        ),
      ),
    );
  }

  Widget _buildWarehouseManagementPanel(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Manage Warehouses',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _warehouseNameController,
              decoration: const InputDecoration(labelText: 'Warehouse Name'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _warehouseLocationController,
              decoration: const InputDecoration(labelText: 'Location'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _warehouseTotalCapacityController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Total Capacity (units)'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _warehouseUsedCapacityController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Used Capacity (units)'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _addWarehouse,
              child: const Text('Add Warehouse'),
            ),
            const SizedBox(height: 12),
            const Divider(),
            const SizedBox(height: 8),
            ...List.generate(_warehouses.length, (index) {
              final Warehouse warehouse = _warehouses[index];
              return ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(warehouse.name),
                subtitle: Text('Location: ${warehouse.location}'),
                trailing: IconButton(
                  icon: const Icon(Icons.delete_outline),
                  onPressed: () => _dropWarehouse(index),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget _buildWarehouseCapacityPanel(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Warehouse Storage Capacity',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            Center(
              child: Wrap(
                spacing: 14,
                runSpacing: 14,
                alignment: WrapAlignment.center,
                runAlignment: WrapAlignment.center,
                children: _warehouses
                    .map(
                      (warehouse) => SizedBox(
                        width: 220,
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [TColors.primary, TColors.accent],
                            ),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Column(
                            children: [
                              Text(
                                warehouse.name,
                                style: Theme.of(context).textTheme.titleSmall,
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 10),
                              _WarehouseCapacityPieChart(warehouse: warehouse),
                            ],
                          ),
                        ),
                      ),
                    )
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _WarehouseCapacityPieChart extends StatelessWidget {
  const _WarehouseCapacityPieChart({required this.warehouse});

  final Warehouse warehouse;

  @override
  Widget build(BuildContext context) {
    final double used = warehouse.usedCapacity;
    final double free = (warehouse.totalCapacity - warehouse.usedCapacity).clamp(0, warehouse.totalCapacity);

    return Column(
      children: [
        SizedBox(
          height: 140,
          width: 140,
          child: Center(
            child: PieChart(
              PieChartData(
                sectionsSpace: 2,
                centerSpaceRadius: 28,
                startDegreeOffset: -90,
                sections: [
                  PieChartSectionData(
                    value: used,
                    color: TColors.accent,
                    radius: 38,
                    title: '',
                  ),
                  PieChartSectionData(
                    value: free,
                    color: Colors.yellow.shade300,
                    radius: 38,
                    title: '',
                  ),
                ],
              ),
              duration: const Duration(milliseconds: 800),
              curve: Curves.easeOutCubic,
            ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          'Used: ${warehouse.usedCapacity.toStringAsFixed(0)} units',
          textAlign: TextAlign.center,
        ),
        Text('Free: ${free.toStringAsFixed(0)} units', textAlign: TextAlign.center),
        Text(
          'Total: ${warehouse.totalCapacity.toStringAsFixed(0)} units',
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class Warehouse {
  Warehouse({
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
