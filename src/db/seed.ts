import { db } from './index.ts';
import { portalCategories, governmentPortals, governmentSchemes, notices, siteSettings } from './schema.ts';
import { PORTAL_CATEGORIES, ALL_150_GOVERNMENT_PORTALS } from '../data/portalData.ts';
import { ALL_GOVERNMENT_SCHEMES } from '../data/schemesData.ts';
import { LATEST_PUBLIC_NOTICES } from '../data/noticesData.ts';
import { sql } from 'drizzle-orm';

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // 1. Seed Portal Categories
    for (const cat of PORTAL_CATEGORIES) {
      await db.insert(portalCategories)
        .values({
          key: cat.key,
          nameHi: cat.nameHi,
          nameEn: cat.nameEn,
          icon: cat.icon,
          descriptionHi: cat.descriptionHi,
        })
        .onConflictDoNothing();
    }
    console.log(`Seeded categories`);

    // 2. Seed All 150 Portals
    for (const p of ALL_150_GOVERNMENT_PORTALS) {
      await db.insert(governmentPortals)
        .values({
          serialNumber: p.serialNumber,
          nameHi: p.nameHi,
          nameEn: p.nameEn,
          slug: p.slug,
          officialUrl: p.officialUrl,
          categoryKey: p.categoryKey,
          department: p.department,
          level: p.level,
          summaryHi: p.summaryHi,
          descriptionHi: p.descriptionHi,
          howItWorksHi: p.howItWorksHi,
          eligibilityNotes: p.eligibilityNotes || null,
          documentNotes: p.documentNotes || null,
          verificationStatus: p.verificationStatus,
          lastVerifiedAt: p.lastVerifiedAt,
          isPopular: p.isPopular || false,
        })
        .onConflictDoUpdate({
          target: governmentPortals.slug,
          set: {
            nameHi: p.nameHi,
            nameEn: p.nameEn,
            officialUrl: p.officialUrl,
            categoryKey: p.categoryKey,
            department: p.department,
            level: p.level,
            summaryHi: p.summaryHi,
            descriptionHi: p.descriptionHi,
            howItWorksHi: p.howItWorksHi,
            verificationStatus: p.verificationStatus,
            lastVerifiedAt: p.lastVerifiedAt,
            isPopular: p.isPopular || false,
          }
        });
    }
    console.log(`Seeded 150 portals`);

    // 3. Seed Schemes
    for (const s of ALL_GOVERNMENT_SCHEMES) {
      await db.insert(governmentSchemes)
        .values({
          nameHi: s.nameHi,
          nameEn: s.nameEn,
          slug: s.slug,
          categoryKey: s.categoryKey,
          department: s.department,
          governmentType: s.governmentType,
          summaryHi: s.summaryHi,
          benefitsHi: s.benefitsHi,
          eligibilityHi: s.eligibilityHi,
          documentsHi: s.documentsHi,
          applyProcessHi: s.applyProcessHi,
          officialUrl: s.officialUrl,
          lastVerifiedAt: s.lastVerifiedAt,
          verificationStatus: s.verificationStatus,
        })
        .onConflictDoNothing();
    }
    console.log(`Seeded schemes`);

    // 4. Seed Notices
    for (const n of LATEST_PUBLIC_NOTICES) {
      await db.insert(notices)
        .values({
          titleHi: n.titleHi,
          titleEn: n.titleEn,
          contentHi: n.contentHi,
          category: n.category,
          date: n.date,
          isUrgent: n.isUrgent || false,
          linkUrl: n.linkUrl || null,
        });
    }
    console.log(`Seeded notices`);

    // 5. Seed Site Settings
    const defaultSettings = [
      { key: 'centre_name', value: 'Shashank CSC Centre' },
      { key: 'owner_name', value: 'Shashank Shekhar' },
      { key: 'owner_email', value: 'shashankshekha2006@gmail.com' },
      { key: 'owner_phone', value: '+91 92412 62642' },
      { key: 'centre_address', value: 'Village Haripur Jharka, Kajhi Chowk, Ward No. 14, District Supaul, Bihar, India' },
      { key: 'service_partner', value: 'Digital Naari' },
    ];
    for (const s of defaultSettings) {
      await db.insert(siteSettings)
        .values(s)
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: s.value }
        });
    }
    console.log(`Seeded site settings`);

    console.log('Database seeding successfully completed.');
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}
