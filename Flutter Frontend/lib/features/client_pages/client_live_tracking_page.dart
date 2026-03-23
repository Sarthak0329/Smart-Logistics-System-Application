import 'package:flutter/material.dart';
import 'package:logistics_system_fluttr_frontend_prj/utils/constants/colors.dart';

class ClientLiveTrackingPage extends StatelessWidget {
  const ClientLiveTrackingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<TrackingUpdate> updates = [
      const TrackingUpdate(
        shipmentId: 'SHP-1001',
        location: 'Near Ajmer Highway Toll',
        eta: 'ETA: 1 hr 20 min',
        progress: 0.72,
      ),
      const TrackingUpdate(
        shipmentId: 'SHP-1003',
        location: 'Mandya Bypass',
        eta: 'ETA: 45 min',
        progress: 0.84,
      ),
      const TrackingUpdate(
        shipmentId: 'SHP-1008',
        location: 'Outer Ring Road, Pune',
        eta: 'ETA: 2 hr 10 min',
        progress: 0.51,
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Live Tracking',
          style: TextStyle(fontSize: 24, fontFamily: 'Jumper'),
        ),
        backgroundColor: TColors.accent,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: updates.length,
        itemBuilder: (context, index) {
          final TrackingUpdate update = updates[index];

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
                Row(
                  children: [
                    Text(
                      update.shipmentId,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const Spacer(),
                    const Icon(Icons.location_pin),
                  ],
                ),
                const SizedBox(height: 4),
                Text('Current Location: ${update.location}'),
                Text(update.eta),
                const SizedBox(height: 10),
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    minHeight: 10,
                    value: update.progress,
                    backgroundColor: Colors.white,
                    color: Colors.orange.shade800,
                  ),
                ),
                const SizedBox(height: 6),
                Text('Progress: ${(update.progress * 100).toStringAsFixed(0)}%'),
              ],
            ),
          );
        },
      ),
    );
  }
}

class TrackingUpdate {
  const TrackingUpdate({
    required this.shipmentId,
    required this.location,
    required this.eta,
    required this.progress,
  });

  final String shipmentId;
  final String location;
  final String eta;
  final double progress;
}
