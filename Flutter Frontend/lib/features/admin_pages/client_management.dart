import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientManagementPage extends StatefulWidget {
  const ClientManagementPage({super.key});

  @override
  State<ClientManagementPage> createState() => _ClientManagementPageState();
}

class _ClientManagementPageState extends State<ClientManagementPage> {
  final List<ClientApplication> _clientApplications = [
    ClientApplication(
      companyName: 'Nexa Retail Pvt Ltd',
      serviceRequested: 'Cold Chain Logistics',
    ),
    ClientApplication(
      companyName: 'Skyline Traders',
      serviceRequested: 'Regional Distribution',
    ),
    ClientApplication(
      companyName: 'Farm2Port Exports',
      serviceRequested: 'Warehouse + Last Mile',
    ),
  ];

  void _verifyClientApplication(int index) {
    setState(() {
      _clientApplications[index].isVerified = true;
    });
  }

  void _certifyClientApplication(int index) {
    if (!_clientApplications[index].isVerified) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Verify this client request before certifying it.'),
        ),
      );
      return;
    }

    setState(() {
      _clientApplications[index].isCertified = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Client Verification',
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
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Client Application Review',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            ...List.generate(_clientApplications.length, (index) {
              final ClientApplication application = _clientApplications[index];

              return Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 560),
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
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
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          application.companyName,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 4),
                        Text('Service: ${application.serviceRequested}'),
                        const SizedBox(height: 8),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            Chip(
                              label: Text(
                                application.isVerified
                                    ? 'Verified'
                                    : 'Not Verified',
                              ),
                            ),
                            Chip(
                              label: Text(
                                application.isCertified
                                    ? 'Certified'
                                    : 'Not Certified',
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Wrap(
                          spacing: 10,
                          runSpacing: 8,
                          children: [
                            ElevatedButton(
                              onPressed: application.isVerified
                                  ? null
                                  : () => _verifyClientApplication(index),
                              child: const Text('Verify'),
                            ),
                            ElevatedButton(
                              onPressed: application.isCertified
                                  ? null
                                  : () => _certifyClientApplication(index),
                              child: const Text('Certify'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class ClientApplication {
  ClientApplication({
    required this.companyName,
    required this.serviceRequested,
    this.isVerified = false,
    this.isCertified = false,
  });

  final String companyName;
  final String serviceRequested;
  bool isVerified;
  bool isCertified;
}
