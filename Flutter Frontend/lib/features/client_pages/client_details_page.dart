import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientDetailsPage extends StatelessWidget {
  const ClientDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<ClientRecord> clients = [
      const ClientRecord(
        name: 'Anaya Bakers',
        contact: '+91 98765 10021',
        deliveryAddress: 'Sector 14, Jaipur, Rajasthan',
        productMeta: 'SKU: BK-451 | Category: Bakery Supplies | Qty: 140',
      ),
      const ClientRecord(
        name: 'Metro Office Supplies',
        contact: '+91 98330 44210',
        deliveryAddress: 'Kothrud, Pune, Maharashtra',
        productMeta: 'SKU: OF-220 | Category: Stationery | Qty: 520',
      ),
      const ClientRecord(
        name: 'GreenLeaf Stores',
        contact: '+91 99100 55338',
        deliveryAddress: 'Anna Nagar, Chennai, Tamil Nadu',
        productMeta: 'SKU: GR-113 | Category: FMCG | Qty: 300',
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Clients & Details',
          style: TextStyle(fontSize: 24, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: clients.length,
        itemBuilder: (context, index) {
          final ClientRecord client = clients[index];
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
                Text(client.name, style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 6),
                Text('Contact: ${client.contact}'),
                Text('Delivery Address: ${client.deliveryAddress}'),
                const SizedBox(height: 6),
                Text('Product Meta: ${client.productMeta}'),
              ],
            ),
          );
        },
      ),
    );
  }
}

class ClientRecord {
  const ClientRecord({
    required this.name,
    required this.contact,
    required this.deliveryAddress,
    required this.productMeta,
  });

  final String name;
  final String contact;
  final String deliveryAddress;
  final String productMeta;
}
