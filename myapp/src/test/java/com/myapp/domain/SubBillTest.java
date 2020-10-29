package com.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.myapp.web.rest.TestUtil;

public class SubBillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubBill.class);
        SubBill subBill1 = new SubBill();
        subBill1.setId(1L);
        SubBill subBill2 = new SubBill();
        subBill2.setId(subBill1.getId());
        assertThat(subBill1).isEqualTo(subBill2);
        subBill2.setId(2L);
        assertThat(subBill1).isNotEqualTo(subBill2);
        subBill1.setId(null);
        assertThat(subBill1).isNotEqualTo(subBill2);
    }
}
