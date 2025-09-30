import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

interface CardMainProps {
  title: string;
  content: string;
  imageUrl: string;
}

export default function CardMain({ title, content, imageUrl }: CardMainProps) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    content: {
        fontSize: 14,
        color: '#666',
    },
    image: {
        width: '100%',
        height: 200,
        aspectRatio: 16 / 9,
        marginBottom: 12,
        borderRadius: 8,
    },
});