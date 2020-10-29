package com.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.myapp.web.rest.TestUtil;

public class PrintInfoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrintInfo.class);
        PrintInfo printInfo1 = new PrintInfo();
        printInfo1.setId(1L);
        PrintInfo printInfo2 = new PrintInfo();
        printInfo2.setId(printInfo1.getId());
        assertThat(printInfo1).isEqualTo(printInfo2);
        printInfo2.setId(2L);
        assertThat(printInfo1).isNotEqualTo(printInfo2);
        printInfo1.setId(null);
        assertThat(printInfo1).isNotEqualTo(printInfo2);
    }
}
