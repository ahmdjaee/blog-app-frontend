import { theme, ThemeConfig } from "antd";

export const configProvider : ThemeConfig = {
    // algorithm: theme.darkAlgorithm
}

const { getDesignToken } = theme;

export const token = getDesignToken(configProvider);

