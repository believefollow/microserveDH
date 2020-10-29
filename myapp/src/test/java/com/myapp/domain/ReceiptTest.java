package com.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.myapp.web.rest.TestUtil;

public class ReceiptTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receipt.class);
        Receipt receipt1 = new Receipt();
        receipt1.setId(1L);
        Receipt receipt2 = new Receipt();
        receipt2.setId(receipt1.getId());
        assertThat(receipt1).isEqualTo(receipt2);
        receipt2.setId(2L);
        assertThat(receipt1).isNotEqualTo(receipt2);
        receipt1.setId(null);
        assertThat(receipt1).isNotEqualTo(receipt2);
    }
}
