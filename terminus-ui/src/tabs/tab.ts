import { TsTabHeaderDirective } from './tab-header.directive';
import { TsTabContentDirective } from './tab-content.directive';

export class Tab {
  public id: string;
  public header: TsTabHeaderDirective;
  public content: TsTabContentDirective;
  public index!: number;

  constructor(header: TsTabHeaderDirective, content: TsTabContentDirective) {
    this.id = header.tsTabHeader;
    this.header = header;
    this.content = content;

    // So that the header and content isActive properties are always in sync.
    /**
     * This is to make sure that header's and contet's isActive property is always is sync.
     */
    this.header.isActiveChange.subscribe(
      () => (this.content.isActive = this.isActive),
    );
  }

  /**
   * Saves accessing .header.isActive every time.
   */
  public get isActive(): boolean {
    return this.header.isActive;
  }

  /**
   * Use to set active class to header and conent.
   */
  public set isActive(active: boolean) {
    /**
     * Use `setActiveState` so as not to fire 'external changes' event.
     */
    this.header.setActiveState(active);
  }

  /**
   * Saves accessing .header.isDisabled every time.
   */
  public get isDisabled(): boolean {
    return this.header.isDisabled;
  }
}
