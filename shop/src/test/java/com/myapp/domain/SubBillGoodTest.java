package com.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.myapp.web.rest.TestUtil;

public class SubBillGoodTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubBillGood.class);
        SubBillGood subBillGood1 = new SubBillGood();
        subBillGood1.setId(1L);
        SubBillGood subBillGood2 = new SubBillGood();
        subBillGood2.setId(subBillGood1.getId());
        assertThat(subBillGood1).isEqualTo(subBillGood2);
        subBillGood2.setId(2L);
        assertThat(subBillGood1).isNotEqualTo(subBillGood2);
        subBillGood1.setId(null);
        assertThat(subBillGood1).isNotEqualTo(subBillGood2);
    }
}
