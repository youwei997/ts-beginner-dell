// html测试分析器

import { Analyzer } from "./Crowller";

class HtmlAnalyzer implements Analyzer {
  analyze(html: string, filePath: string) {
    return html;
  }
}
export default HtmlAnalyzer;
