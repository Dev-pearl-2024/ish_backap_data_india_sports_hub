import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { 
  useIAP, 
  initConnection, 
  endConnection, 
  getSubscriptions, 
  requestSubscription, 
  flushFailedPurchasesCachedAsPendingAndroid,
  getPurchaseHistory 
} from 'react-native-iap';

const subscriptionSkus = Platform.select({
  ios: ["indiasportshubpremium"],
  android: ["indiasportshubpremium"]
});

const IAPScreen = () => {
  const {
    connected,
    subscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  const [connection, setConnection] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [fetchedSubscriptions, setFetchedSubscriptions] = useState([]);

  useEffect(() => {
    initializeIAP();

    // Cleanup on unmount
    return () => {
      endConnection();
    };
  }, []);

  const initializeIAP = async () => {
    try {
      await initConnection().then(async (value) => {
        setConnection(value);
        if (Platform.OS === 'android') {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }
      });
    } catch (error) {
      console.error('Error initializing IAP: ', error);
    }
  };

  useEffect(() => {
    if (connected || connection) {
      loadSubscriptions();
      loadPurchaseHistory();
    }
  }, [connected, connection]);

  const loadSubscriptions = async () => {
    try {
      // Fetch subscriptions and update state
      const fetchedSubs = await getSubscriptions({ skus: subscriptionSkus });
      console.log('Available Subscriptions:', fetchedSubs);

      // Update the local state with fetched subscriptions
      setFetchedSubscriptions(fetchedSubs);
    } catch (error) {
      console.error('[IAP] Error loading subscriptions:', error);
    }
  };

  const loadPurchaseHistory = async () => {
    try {
      const history = await getPurchaseHistory();
      setPurchaseHistory(history);
      console.log('Purchase History:', history);
    } catch (error) {
      console.error('[IAP] Error fetching purchase history:', error);
    }
  };

  const handleBuySubscription = async (subscription) => {
  

    console.log('subscription===>>',subscription)
    try {
      const sku = subscriptions[0]

      const offerToken = sku?.subscriptionOfferDetails[0]?.offerToken

    const purchaseData = await requestSubscription({
      sku: sku?.productId,
      ...(offerToken && {
        subscriptionOffers: [{ sku: sku?.productId, offerToken }],
      }),
    });

    } catch (error) {
      console.error('Error making purchase:', error);
      Alert.alert('Error', 'Failed to make the purchase. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>In-App Purchase Screen</Text>

      {/* Display Subscriptions */}
      <View style={styles.subscriptions}>
        {fetchedSubscriptions.length === 0 ? (
          <Text>No subscriptions available</Text>
        ) : (
          fetchedSubscriptions.map((subscription) => (
            <View key={subscription.productId} style={styles.subscriptionItem}>
              <Text style={styles.subscriptionTitle}>{subscription.title}</Text>
              {subscription.description ? (
                <Text>{subscription.description}</Text>
              ) : (
                <Text>No description available</Text>
              )}
              <Text>{subscription.price}</Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleBuySubscription(subscription)}
              >
                <Text style={styles.buttonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Display Purchase History */}
      <View style={styles.purchaseHistory}>
        <Text style={styles.subHeader}>Purchase History:</Text>
        {purchaseHistory.length === 0 ? (
          <Text>No purchase history found.</Text>
        ) : (
          purchaseHistory.map((purchase, index) => (
            <View key={index} style={styles.historyItem}>
              <Text>Product ID: {purchase.productId}</Text>
              <Text>Status: {purchase.transactionReceipt ? 'Completed' : 'Pending'}</Text>
              <Text>Date: {new Date(purchase.transactionDate).toLocaleString()}</Text>
            </View>
          ))
        )}
      </View>

      {/* Debugging */}
      <Text style={styles.debugText}>Connection Status: {connected ? 'Connected' : 'Not Connected'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subscriptions: {
    width: '100%',
    marginBottom: 20,
  },
  subscriptionItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  debugText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseHistory: {
    width: '100%',
    marginTop: 20,
  },
  historyItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    marginBottom: 10,
  },
});

export default IAPScreen;
