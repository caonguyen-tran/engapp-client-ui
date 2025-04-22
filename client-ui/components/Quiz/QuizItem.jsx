import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Constant';
import { formatDate } from '../../utils/common';

const QuizItem = ({ item, onStartQuiz }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.isActive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)' }
          ]}>
            <MaterialIcons
              name={item.isActive ? 'check-circle' : 'error'}
              size={16}
              color={item.isActive ? COLORS.activeQuiz : COLORS.inactiveQuiz}
            />
            <Text style={[
              styles.statusText,
              { color: item.isActive ? COLORS.activeQuiz : COLORS.inactiveQuiz }
            ]}>
              {item.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <MaterialIcons name="event" size={16} color="#666" />
            <Text style={styles.metaText}>
              {formatDate(item.createdDate)}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="menu-book" size={16} color="#666" />
            <Text style={styles.metaText}>
              Reading Part {item.readingPart}
            </Text>
          </View>
        </View>
      </View>

      {item.isActive && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => onStartQuiz(item.id)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="play-arrow" size={20} color="#fff" />
            <Text style={styles.buttonText}>Bắt đầu làm bài</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    padding: 16,
    paddingTop: 0,
  },
  startButton: {
    backgroundColor: COLORS.active,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.active,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizItem; 