import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma';
import { SocialYouTubePublishingService } from '../services/social/youtube-publishing.service';

async function main() {
  console.log('--- Starting YouTube Test Upload ---');

  // Check connected accounts
  const account = await prisma.socialAccount.findFirst({
    where: { platform: 'YOUTUBE' },
  });

  if (!account) {
    console.error('ERROR: No YouTube account found in database.');
    process.exit(1);
  }

  console.log(`Found YouTube Account: "${account.accountName}" (Status: ${account.status})`);

  const videoPath = path.join(process.cwd(), 'public', 'assets', 'video', 'mandi-rates-template.mp4');
  if (!fs.existsSync(videoPath)) {
    console.error('ERROR: Video template file not found at:', videoPath);
    process.exit(1);
  }

  const videoBuffer = fs.readFileSync(videoPath);
  console.log(`Loaded video buffer: ${(videoBuffer.length / (1024 * 1024)).toFixed(2)} MB`);

  const title = `KiranaMart247 Mandi Rates Test — ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  const description = `Live automated testing of KiranaMart247 AI Social Dispatch for wholesale mandi prices.\n\nWebsite: https://kiranamart247.com\nVerified Channel: Kirana Mart`;
  const tags = ['kiranamart', 'mandirates', 'wholesalemarket', 'delhimandi', 'shorts'];

  console.log(`Uploading test video to YouTube: "${title}"...`);

  const result = await SocialYouTubePublishingService.uploadVideo({
    title,
    description,
    tags,
    videoBuffer,
    mimeType: 'video/mp4',
    isShort: true,
  });

  console.log('Upload Result:', JSON.stringify(result, null, 2));

  if (result.success) {
    console.log(`\n🎉 SUCCESS! Video uploaded successfully.`);
    console.log(`Video ID: ${result.videoId}`);
    console.log(`Video Link: ${result.videoUrl}`);
  } else {
    console.error('\n❌ FAILED to upload:', result.error);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Unhandled error during upload:', err);
  process.exit(1);
});
