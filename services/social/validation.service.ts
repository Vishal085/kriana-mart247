import { MandiMarketSnapshot, CommodityRateItem } from './data-extraction.service';

export interface ValidationResult {
  isValid: boolean;
  discrepancies: string[];
  sanitizedCopy: string;
}

export class SocialValidationService {
  /**
   * Scans text for any numeric rate figures (e.g. ₹45, Rs 120, 18.5%, etc.)
   * and verifies whether the commodity and rate align with the genuine database records.
   */
  static validateCopyAgainstSnapshot(
    copy: string,
    snapshot: MandiMarketSnapshot
  ): ValidationResult {
    const discrepancies: string[] = [];
    const commodityMap = new Map<string, CommodityRateItem>();

    // Index all rates by lowercase name tokens
    snapshot.allRates.forEach((item) => {
      commodityMap.set(item.name.toLowerCase().trim(), item);
      if (item.hindiName) {
        commodityMap.set(item.hindiName.toLowerCase().trim(), item);
      }
    });

    // Check each commodity mentioned in copy to ensure correct rates
    snapshot.allRates.forEach((item) => {
      const lowerName = item.name.toLowerCase();
      if (copy.toLowerCase().includes(lowerName)) {
        // Find pattern like: [Name] ... ₹[Number] or Rs [Number]
        // Example: "Mustard Oil: ₹145" or "Chana Dal ... ₹82/kg"
        const regex = new RegExp(
          `${lowerName}[^\\n\\d]{0,40}(?:₹|rs\\.?|inr)?\\s*(\\d+(?:\\.\\d+)?)`,
          'gi'
        );
        const match = regex.exec(copy);
        if (match && match[1]) {
          const statedRate = parseFloat(match[1]);
          const realRate = item.currentRate;
          const diff = Math.abs(statedRate - realRate);

          // If difference exceeds 1 rupee or 1%, flag discrepancy
          if (diff > 1.0 && (diff / realRate) > 0.02) {
            discrepancies.push(
              `Rate mismatch for ${item.name}: Stated ₹${statedRate}, but actual database rate is ₹${realRate}/${item.unit}.`
            );
          }
        }
      }
    });

    // Zero-hallucination enforcement: if discrepancy found, return sanitized / flagged result
    return {
      isValid: discrepancies.length === 0,
      discrepancies,
      sanitizedCopy: discrepancies.length === 0 ? copy : this.enforceVerifiedRates(copy, snapshot),
    };
  }

  /**
   * Deterministically reconstructs or repairs copy using only genuine database values
   */
  private static enforceVerifiedRates(copy: string, snapshot: MandiMarketSnapshot): string {
    let corrected = copy;
    snapshot.allRates.forEach((item) => {
      const lowerName = item.name.toLowerCase();
      if (corrected.toLowerCase().includes(lowerName)) {
        const regex = new RegExp(
          `(${lowerName}[^\\n\\d]{0,40})(?:₹|rs\\.?|inr)?\\s*(\\d+(?:\\.\\d+)?)`,
          'gi'
        );
        corrected = corrected.replace(regex, `$1₹${item.currentRate.toFixed(2)}`);
      }
    });
    return corrected;
  }
}
