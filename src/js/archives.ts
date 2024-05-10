// 定义归档页上下文接口
interface ArchivesContext {
  initExpander: () => void;
}

// 实现归档页上下文类
class Archives implements ArchivesContext {
  // 初始化内容折叠/展开功能
  initExpander(): void {
    // 获取所有的时间线面板
    const timelistPanels: NodeListOf<HTMLElement> = document.querySelectorAll('.joe_archives-timelist .panel');

    // 为每个面板添加点击事件监听器
    timelistPanels.forEach(panel => {
      panel.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        const titleHeight = panel.offsetHeight; // 获取标题高度
        const content = panel.nextElementSibling as HTMLElement; // 获取内容面板
        const contentHeight = content.offsetHeight;
        const wrapper = panel.parentElement as HTMLElement; // 获取内容高度

        // 切换折叠状态
        if (panel.classList.contains('in')) {
          panel.classList.remove('in');
          //panel.style.height = `${titleHeight}px`;
          wrapper.style.height = `${titleHeight}px`;
        } else {
          panel.classList.add('in');
          wrapper.style.height = `${titleHeight + contentHeight}px`;
          //panel.style.height = `${titleHeight + contentHeight}px`;
        }
      });
    });
  }
}

// 创建归档页上下文实例
const archivesContext = new Archives();

// 当DOM内容完全加载后初始化折叠/展开功能
document.addEventListener('DOMContentLoaded', () => {
  archivesContext.initExpander();
});