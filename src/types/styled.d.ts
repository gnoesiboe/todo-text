import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Record<'first' | 'second' | 'third' | 'fourth', string>;
    }
}
