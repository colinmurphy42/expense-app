import { Injectable } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { ReportType } from 'src/data';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSummary() {
    const totalExpense = this.reportService
      .getReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalIncome = this.reportService
      .getReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
