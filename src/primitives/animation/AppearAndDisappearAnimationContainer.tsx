import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
    children: ReactNode;
};

const xAnimation = 20;

const AppearAndDisappearAnimationContainer: React.FC<Props> = ({
    children,
}) => (
    <motion.div
        initial={{ opacity: 0, x: -xAnimation }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: xAnimation }}
        transition={{
            type: 'linear',
            delay: 0.3,
        }}
    >
        {children}
    </motion.div>
);

export default AppearAndDisappearAnimationContainer;
