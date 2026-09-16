import { MandiMarketSnapshot } from './data-extraction.service';

export interface SocialMediaAssets {
  squareImageSvg: string;
  squareImageDataUrl: string;
  verticalStorySvg: string;
  verticalStoryDataUrl: string;
  reelStoryboardFrames: Array<{
    frameNumber: number;
    title: string;
    svg: string;
    dataUrl: string;
  }>;
}

export class SocialAssetGeneratorService {
  /**
   * Generates high-resolution branded SVG graphics for 1080x1080 and 1080x1920 viewports.
   */
  static generateAssets(snapshot: MandiMarketSnapshot): SocialMediaAssets {
    const squareSvg = this.renderSquareGraphicSvg(snapshot);
    const verticalSvg = this.renderVerticalStorySvg(snapshot);
    const storyboard = this.renderStoryboardFrames(snapshot);

    return {
      squareImageSvg: squareSvg,
      squareImageDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(squareSvg)}`,
      verticalStorySvg: verticalSvg,
      verticalStoryDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(verticalSvg)}`,
      reelStoryboardFrames: storyboard.map((f) => ({
        ...f,
        dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(f.svg)}`,
      })),
    };
  }

  /**
   * 1080x1080 Instagram & Facebook Feed Graphic
   */
  static renderSquareGraphicSvg(snapshot: MandiMarketSnapshot): string {
    const { formattedDate, mandiName, topGainers, topLosers, keyCommodities } = snapshot;

    const itemsToDisplay = keyCommodities.slice(0, 6);

    const rowsSvg = itemsToDisplay
      .map((item, idx) => {
        const yPos = 380 + idx * 95;
        const dir = item.direction as any;
        const isUp = dir === 'RISING' || dir === 'UP' || item.currentRate > item.previousRate;
        const isDown = dir === 'FALLING' || dir === 'DOWN' || item.currentRate < item.previousRate;
        const badgeColor = isUp ? '#10b981' : isDown ? '#ef4444' : '#64748b';
        const badgeText = isUp
          ? `+₹${item.absoluteChange}`
          : isDown
          ? `-₹${item.absoluteChange}`
          : 'STABLE';

        return `
        <!-- Item Row ${idx + 1} -->
        <g transform="translate(80, ${yPos})">
          <rect width="920" height="78" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <circle cx="45" cy="39" r="18" fill="#0f172a"/>
          <text x="45" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#38bdf8" text-anchor="middle">${idx + 1}</text>
          
          <text x="85" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#f8fafc">${item.name}</text>
          <text x="85" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">${item.category} • Per ${item.unit}</text>
          
          <text x="680" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#facc15" text-anchor="end">₹${item.currentRate.toFixed(2)}</text>
          <text x="680" y="66" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#64748b" text-anchor="end">Prev: ₹${item.previousRate.toFixed(2)}</text>
          
          <!-- Badge -->
          <rect x="710" y="22" width="180" height="34" rx="10" fill="${badgeColor}" fill-opacity="0.2" stroke="${badgeColor}" stroke-width="1"/>
          <text x="800" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold" fill="${badgeColor}" text-anchor="middle">${badgeText}</text>
        </g>
        `;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#bgGrad)" />

  <!-- Top Decorative Accent -->
  <circle cx="100" cy="50" r="180" fill="#059669" opacity="0.15" filter="url(#glow)" />
  <circle cx="980" cy="150" r="140" fill="#0284c7" opacity="0.1" filter="url(#glow)" />

  <!-- Header Section -->
  <g transform="translate(80, 80)">
    <!-- Brand Logo Pill -->
    <rect width="260" height="48" rx="24" fill="url(#primaryGrad)"/>
    <text x="130" y="31" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">KIRANAMART247</text>

    <!-- Verified Badge -->
    <rect x="280" y="6" width="190" height="36" rx="18" fill="#1e293b" stroke="#059669" stroke-width="1.5"/>
    <circle cx="298" cy="24" r="6" fill="#10b981"/>
    <text x="312" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#10b981">APMC VERIFIED</text>

    <!-- Title -->
    <text x="0" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff">DAILY MANDI RATES</text>
    <text x="0" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#38bdf8">${mandiName}</text>

    <!-- Date Pill -->
    <g transform="translate(680, 20)">
      <rect width="240" height="52" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="120" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="700" fill="#cbd5e1" text-anchor="middle">📅 ${formattedDate}</text>
    </g>
  </g>

  <!-- Rate Table Rows -->
  ${rowsSvg}

  <!-- Footer Banner -->
  <g transform="translate(80, 980)">
    <rect width="920" height="60" rx="16" fill="#064e3b" stroke="#059669" stroke-width="1.5"/>
    <text x="40" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#a7f3d0">🌐 Live Wholesale Rates Across 400+ Mandis</text>
    <text x="880" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#34d399" text-anchor="end">kiranamart247.com →</text>
  </g>
</svg>`;
  }

  /**
   * 1080x1920 Vertical Story / Reel / Short SVG
   */
  static renderVerticalStorySvg(snapshot: MandiMarketSnapshot): string {
    const { formattedDate, mandiName, topGainers, topLosers, keyCommodities } = snapshot;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="vBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#052e16" />
    </linearGradient>
    <linearGradient id="vPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>

  <rect width="1080" height="1920" fill="url(#vBgGrad)" />

  <!-- Top Logo Bar -->
  <g transform="translate(100, 160)">
    <rect width="320" height="64" rx="32" fill="url(#vPrimaryGrad)"/>
    <text x="160" y="41" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle">KIRANAMART247</text>
    
    <rect x="620" y="8" width="260" height="48" rx="24" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <text x="750" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#94a3b8" text-anchor="middle">📅 ${formattedDate}</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(100, 290)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="900" fill="#ffffff">MANDI RATES</text>
    <text x="0" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="900" fill="#34d399">TODAY's UPDATE</text>
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="600" fill="#94a3b8">📍 ${mandiName}</text>
  </g>

  <!-- Top Gainers Card -->
  <g transform="translate(100, 480)">
    <rect width="880" height="420" rx="24" fill="#1e293b" stroke="#059669" stroke-width="2"/>
    <rect x="0" y="0" width="880" height="70" rx="24" fill="#064e3b"/>
    <text x="40" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#a7f3d0">📈 TOP GAINERS (TEZI)</text>
    
    ${topGainers.slice(0, 3).map((g, idx) => `
      <g transform="translate(40, ${110 + idx * 95})">
        <text x="0" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#ffffff">${g.name}</text>
        <text x="0" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#94a3b8">Per ${g.unit}</text>
        <text x="600" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#facc15" text-anchor="end">₹${g.currentRate}</text>
        <rect x="630" y="12" width="170" height="40" rx="12" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
        <text x="715" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#34d399" text-anchor="middle">+₹${g.absoluteChange}</text>
      </g>
    `).join('')}
  </g>

  <!-- Key Essentials Card -->
  <g transform="translate(100, 950)">
    <rect width="880" height="520" rx="24" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <rect x="0" y="0" width="880" height="70" rx="24" fill="#1e293b"/>
    <text x="40" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#38bdf8">🛒 DAILY ESSENTIALS BHAV</text>

    ${keyCommodities.slice(0, 4).map((k, idx) => {
      const kDir = k.direction as any;
      const fillColor = kDir === 'RISING' || kDir === 'UP' || k.currentRate > k.previousRate ? '#10b981' : kDir === 'FALLING' || kDir === 'DOWN' || k.currentRate < k.previousRate ? '#ef4444' : '#64748b';
      return `
      <g transform="translate(40, ${110 + idx * 95})">
        <text x="0" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="700" fill="#ffffff">${k.name}</text>
        <text x="0" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#94a3b8">${k.category} • ${k.unit}</text>
        <text x="700" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="end">₹${k.currentRate.toFixed(2)}</text>
        <circle cx="750" cy="32" r="10" fill="${fillColor}"/>
      </g>
    `;}).join('')}
  </g>

  <!-- Call to action footer -->
  <g transform="translate(100, 1550)">
    <rect width="880" height="180" rx="28" fill="#0f172a" stroke="#059669" stroke-width="3"/>
    <text x="440" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff" text-anchor="middle">APMC Verified Rates Every Morning</text>
    <rect x="190" y="90" width="500" height="60" rx="30" fill="url(#vPrimaryGrad)"/>
    <text x="440" y="128" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">VISIT KIRANAMART247.COM</text>
  </g>
</svg>`;
  }

  /**
   * 4-Scene Reel/Short Storyboard frames
   */
  static renderStoryboardFrames(snapshot: MandiMarketSnapshot): Array<{ frameNumber: number; title: string; svg: string }> {
    return [
      {
        frameNumber: 1,
        title: 'Hook & Opening Intro',
        svg: this.renderSquareGraphicSvg(snapshot),
      },
      {
        frameNumber: 2,
        title: 'Top Gainers (Tezi)',
        svg: this.renderVerticalStorySvg(snapshot),
      },
    ];
  }
}
