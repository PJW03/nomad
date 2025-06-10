import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const FOOTER_HEIGHT = 64;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 스크롤 가능한 메인 콘텐츠 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            {/* 토스뱅크 영역 */}
            <Text style={styles.title}>토스뱅크</Text>
            <View style={styles.accountRow}>
              <View>
                <Text style={styles.accountName}>입출금통장</Text>
                <Text style={styles.amount}>310,010원</Text>
              </View>
              <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>송금</Text></TouchableOpacity>
            </View>
            <View style={styles.accountRow}>
              <View>
                <Text style={styles.accountName}>모임통장</Text>
                <Text style={styles.amount}>155원</Text>
              </View>
              <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>지금 받기</Text></TouchableOpacity>
            </View>
            <View style={styles.accountRow}>
              <View>
                <Text style={styles.accountName}>비상금통장</Text>
                <Text style={styles.amount}>0원</Text>
              </View>
              <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>송금</Text></TouchableOpacity>
            </View>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickBtn}>
                <Text style={styles.quickBtnText}>대출 0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickBtn}>
                <Text style={styles.quickBtnText}>증권 0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickBtn}>
                <Text style={styles.quickBtnText}>저축 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickBtn}>
                <Text style={styles.quickBtnText}>전체 14</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accountRow}>
              <View>
                <Text style={styles.subAmount}>내 자산</Text>
                <Text style={styles.amount}>462,030원</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>새 내역 10건 +</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accountRow}>
              <Text style={styles.subAmount}>6월 5일 낸 카드값</Text>
              <Text style={styles.cardPay}>11,400원</Text>
            </View>

            {/* 신용점수 및 추천 영역 */}
            <View style={styles.divider} />
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>내 신용점수</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>확인하기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickBtn}><Text style={styles.quickBtnText}>계좌개설</Text></TouchableOpacity>
              <TouchableOpacity style={styles.quickBtn}><Text style={styles.quickBtnText}>카드발급</Text></TouchableOpacity>
              <TouchableOpacity style={styles.quickBtn}><Text style={styles.quickBtnText}>대출받기</Text></TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>표재원님을 위해 준비했어요</Text>
            <View style={styles.cardRow}>
              <TouchableOpacity style={styles.recommendCard}><Text style={styles.recommendText}>혜택 받는 체크카드</Text></TouchableOpacity>
              <TouchableOpacity style={styles.recommendCard}><Text style={styles.recommendText}>혜택 받는 신용카드</Text></TouchableOpacity>
            </View>
            <View style={styles.menuList}>
              <TouchableOpacity><Text style={styles.menuText}>토스신용카드</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.menuText}>토스프라임</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.menuText}>토스페이 카드·통장 혜택</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.settingBtn}><Text style={styles.settingBtnText}>홈 자산 설정</Text></TouchableOpacity>
          </View>
        </ScrollView>

        {/* 하단 고정 탭 */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerText}>홈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerText}>송금</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerText}>혜택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerText}>전체</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: FOOTER_HEIGHT + 24, // footer와 겹치지 않게 여유
    minHeight: SCREEN_HEIGHT,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    minHeight: SCREEN_HEIGHT - 52,
    justifyContent: 'flex-start',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 18 },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  accountName: { fontSize: 14, color: '#888' },
  amount: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  subAmount: { fontSize: 13, color: '#64748b' },
  cardPay: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
  actionBtn: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 16,
  },
  actionText: { color: '#6366f1', fontWeight: 'bold' },
  assetSummary: { marginVertical: 8 },
  assetText: { fontSize: 12, color: '#94a3b8' },
  linkText: { color: '#6366f1', fontWeight: 'bold', fontSize: 13 },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  creditLabel: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  quickBtn: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  quickBtnText: { color: '#334155', fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#475569',
    marginVertical: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  recommendCard: {
    backgroundColor: '#f0fdfa',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  recommendText: { color: '#0891b2', fontWeight: 'bold', fontSize: 14 },
  menuList: { marginBottom: 18 },
  menuText: {
    fontSize: 15,
    color: '#334155',
    paddingVertical: 7,
    paddingLeft: 5,
  },
  settingBtn: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  settingBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  // 하단 고정 탭
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: FOOTER_HEIGHT,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 8,
  },
  footerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
