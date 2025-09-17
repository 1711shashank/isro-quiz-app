/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { vhUnit } from '@/utils/Dimensions';
import { theme } from '@/constants/AppTheme';
import CustomText from '@/components/CustomText';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

interface ISROData {
    id: string;
    name: string;
    description?: string;
    launch_date?: string;
    status?: string;
    type?: string;
    country?: string;
    [key: string]: any;
}

const LearningScreen = () => {
    const [activeTab, setActiveTab] = useState<'spacecrafts' | 'launchers' | 'satellites' | 'centres'>('spacecrafts');
    const [data, setData] = useState<ISROData[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const apiEndpoints = {
        spacecrafts: 'https://isro.vercel.app/api/spacecrafts',
        launchers: 'https://isro.vercel.app/api/launchers',
        satellites: 'https://isro.vercel.app/api/customer_satellites',
        centres: 'https://isro.vercel.app/api/centres'
    };

    const fetchData = async (endpoint: string) => {
        try {
            setLoading(true);
            const response = await fetch(endpoint);
            const result = await response.json();
            setData(result.spacecrafts || result.launchers || result.customer_satellites || result.centres || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData(apiEndpoints[activeTab]);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData(apiEndpoints[activeTab]);
    }, [activeTab]);

    const tabs = [
        { id: 'spacecrafts', title: 'Spacecrafts', icon: <FontAwesome6 name="rocket" size={16} color={theme.primaryColor} /> },
        { id: 'launchers', title: 'Launchers', icon: <FontAwesome6 name="bolt" size={16} color={theme.primaryColor} /> },
        { id: 'satellites', title: 'Satellites', icon: <FontAwesome6 name="satellite" size={16} color={theme.primaryColor} /> },
        { id: 'centres', title: 'Centres', icon: <FontAwesome6 name="building" size={16} color={theme.primaryColor} /> }
    ];

    const getItemIcon = (type: string) => {
        switch (type) {
            case 'spacecrafts': return <FontAwesome6 name="rocket" size={24} color={theme.primaryColor} />;
            case 'launchers': return <FontAwesome6 name="bolt" size={24} color={theme.primaryColor} />;
            case 'satellites': return <FontAwesome6 name="satellite" size={24} color={theme.primaryColor} />;
            case 'centres': return <FontAwesome6 name="building" size={24} color={theme.primaryColor} />;
            default: return <Ionicons name="information-circle" size={24} color={theme.primaryColor} />;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <CustomText text="ISRO Knowledge Hub" style={styles.headerTitle} />
                <CustomText text="Explore ISRO's missions, vehicles, and achievements" style={styles.headerSubtitle} />
            </View>

            {/* Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ padding: 10, maxHeight: 60 * vhUnit }}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.tab,
                            activeTab === tab.id && styles.activeTab
                        ]}
                        onPress={() => setActiveTab(tab.id as any)}
                    >
                        <View style={styles.tabContent}>
                            <CustomText
                                text={tab.title}
                                style={[
                                    styles.tabText,
                                    ...(activeTab === tab.id ? [styles.activeTabText] : [])
                                ]}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Content */}
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <CustomText text={`Loading ${activeTab}...`} />
                    </View>
                ) : data.length > 0 ? (
                    data.map((item, index) => (
                        <View key={item.id || index} style={styles.itemCard}>
                            <View style={styles.itemHeader}>
                                <View style={styles.itemIconContainer}>
                                    {getItemIcon(activeTab)}
                                </View>
                                <View style={styles.itemInfo}>
                                    <CustomText text={item.name || item.id || 'Unknown'} style={styles.itemName} />
                                    {item.launch_date && (
                                        <CustomText text={formatDate(item.launch_date)} style={styles.itemDate} />
                                    )}
                                </View>
                            </View>

                            {item.description && (<CustomText text={item.description} style={styles.itemDescription} />)}

                            <View style={styles.itemDetails}>
                                {item.status && (
                                    <View style={styles.detailItem}>
                                        <CustomText text="Status:" style={styles.detailLabel} />
                                        <CustomText text={item.status} style={styles.detailValue} />
                                    </View>
                                )}
                                {item.type && (
                                    <View style={styles.detailItem}>
                                        <CustomText text="Type:" style={styles.detailLabel} />
                                        <CustomText text={item.type} style={styles.detailValue} />
                                    </View>
                                )}
                                {item.country && (
                                    <View style={styles.detailItem}>
                                        <CustomText text="Country:" style={styles.detailLabel} />
                                        <CustomText text={item.country} style={styles.detailValue} />
                                    </View>
                                )}
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="information-circle" size={48} color={theme.secondaryTextColor} />
                        <CustomText text={`No ${activeTab} data available`} style={styles.emptyText} />
                        <CustomText text="Pull down to refresh" style={styles.emptySubtext} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.screenBgColor,
    },
    header: {
        backgroundColor: theme.primaryColor,
        padding: 20 * vhUnit,
        paddingTop: 80 * vhUnit,
    },
    headerTitle: {
        fontSize: 24 * vhUnit,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4 * vhUnit,
    },
    headerSubtitle: {
        fontSize: 16 * vhUnit,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 22 * vhUnit,
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16 * vhUnit,
        paddingVertical: 8 * vhUnit,
        borderRadius: 20 * vhUnit,
        marginRight: 12 * vhUnit,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        backgroundColor: 'white',
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: theme.primaryColor,
    },
    tabText: {
        fontSize: 14 * vhUnit,
        fontWeight: '500',
        color: theme.primaryColor,
        marginLeft: 6 * vhUnit,
    },
    activeTabText: {
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 20 * vhUnit,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40 * vhUnit,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40 * vhUnit,
    },
    emptyText: {
        fontSize: 18 * vhUnit,
        fontWeight: '500',
        color: theme.primaryTextColor,
        marginTop: 16 * vhUnit,
        marginBottom: 8 * vhUnit,
    },
    emptySubtext: {
        fontSize: 14 * vhUnit,
        color: theme.secondaryTextColor,
    },
    itemCard: {
        backgroundColor: 'white',
        borderRadius: 12 * vhUnit,
        padding: 16 * vhUnit,
        marginBottom: 12 * vhUnit,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12 * vhUnit,
    },
    itemIconContainer: {
        width: 40 * vhUnit,
        height: 40 * vhUnit,
        borderRadius: 20 * vhUnit,
        backgroundColor: theme.primaryColor + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12 * vhUnit,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16 * vhUnit,
        fontWeight: '600',
        color: theme.primaryTextColor,
        marginBottom: 2 * vhUnit,
    },
    itemDate: {
        fontSize: 12 * vhUnit,
        color: theme.secondaryTextColor,
    },
    itemDescription: {
        fontSize: 14 * vhUnit,
        color: theme.primaryTextColor,
        lineHeight: 20 * vhUnit,
        marginBottom: 12 * vhUnit,
    },
    itemDetails: {
        gap: 6 * vhUnit,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12 * vhUnit,
        color: theme.secondaryTextColor,
        marginRight: 8 * vhUnit,
        minWidth: 60 * vhUnit,
    },
    detailValue: {
        fontSize: 12 * vhUnit,
        color: theme.primaryTextColor,
        fontWeight: '500',
    },
});

export default LearningScreen;

